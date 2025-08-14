import { apiPost, apiPostToken, apiGetToken } from "../../api/axios";
import { load } from '@cashfreepayments/cashfree-js';
import { CashFreeMode } from "../../config";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";


const Subscription = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState();
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const theme = useTheme();
  let cashfree;
  console.log(CashFreeMode, "CashFreeMode");

  let initializeSdk = async () => {
    cashfree = await load({
      mode: CashFreeMode
    })
  }

  initializeSdk();

  const getPricingPlans = async () => {
    try {
      const response = await apiGetToken(`/admin/getPricing`);
      console.log("response", response);

      if (response?.data?.status === 200) {
        console.log("response.data.data", response.data.data);
        const data = response.data.data;
        console.log(data, "dataPlans");

        let plans = data.map((plan) => {
          return {
            title: plan?.planName,
            price: plan?.price,
            days: plan?.duration,
            planId: plan?._id,
            subtitle: "per Year",
            benefits: ["Tests", "Trainings", "Full Access"],
            trialText: "Get 7-day free trial (autopay)",
            cancelNote: "Cancellation: Cancel within 15 days or ₹1999 will deduct from the account",
          }
        })
        console.log("plans", plans);
        setSubscriptionPlans(plans)
      } else {
        snackbarEmitter("Failed to fetch subscription plans. Please try again.", "error");
      }
    } catch (error) { }
  }

  useEffect(() => {
    getPricingPlans();
  }, [])

  const handleSubscription = (plan) => {
    if (!token) {
      navigate("/login");
      return;
    }
    setSelectedPlan(plan);
    setPhoneInput(user?.phone || "");
    setPhoneModalOpen(true);
  };

  const handlePhoneSubmit = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneInput) || phoneInput === "9999999999") {
      snackbarEmitter("Please enter a valid 10-digit mobile number.", "error");
      return;
    }

    setPhoneModalOpen(false);

    try {
      const requestBody = {
        "duration": selectedPlan?.days,
        "price": selectedPlan?.price,
        "subscriptionPlan": selectedPlan?.title,
        "pricingId": selectedPlan?.planId,

      }
      const subscriptionRes = await apiPostToken(`/subscription/createSubscription`, requestBody);
      if (subscriptionRes?.data?.status === 200) {
        console.log("createSubscription response", subscriptionRes.data);

        const subscriptionData =
        {
          "subcriptionId": subscriptionRes.data.data._id,
          "amount": Number(selectedPlan.price),
          "duration": parseInt(selectedPlan.days),
          "phone": phoneInput
        }
        console.log(subscriptionRes.data, "createSubscription response");

        const response = await apiPostToken(`/subscription/createSubscriptionPayment`, subscriptionData);
        if (response?.data?.status === 200) {
          let order = response.data.data;
          console.log("createSubscriptionPayment response", order);

          const options = {
            paymentSessionId: order?.paymentDetails?.payment_session_id,
            redirectTarget: "_modal",
          };
          console.log(options, "options");

          cashfree.checkout(options).then(async (data) => {
            console.log(data, "checkout response");
            const paymentMessage = data?.paymentDetails?.paymentMessage;
            if (data?.payment_status === "SUCCESS") {
              handleVerifySubscription(order);
            }
            else if (paymentMessage === "Payment finished. Check status.") {
              handleVerifySubscription(order);
            }
            else {
              snackbarEmitter("Payment was cancelled or failed.", "error");
            }
          }).catch((error) => {
            snackbarEmitter("An error occurred during payment. Please try again.", "error");
          });
        }
      }
      else {
        snackbarEmitter("Failed to create subscription. Please try again.", "error");
      }
    } catch (error) {
      snackbarEmitter("Failed to create subscription. Please try again.", "error");
    }
  };

  const handleVerifySubscription = async (order) => {
    const response = await apiPostToken(`/subscription/verifySubscriptionPaymentStatus`, { orderId: order?.orderId });
    console.log(response.data, "verifySubscriptionPaymentStatus response");

    if (response.data.status === 200) {
      snackbarEmitter("Payment Successful!", "success");
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date(subscriptionStartDate);
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + Number(response.data.data.duration));

      const updatedUser = {
        ...user,
        subscriptionStartDate: subscriptionStartDate.toISOString(),
        subscriptionEndDate: subscriptionEndDate.toISOString(),
        isSubscribed: true,
      };

      console.log(updatedUser, "updatedUser");

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/test")
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "auto", display: "flex", alignItems: "center", justifyContent: "center", }}>
      <Container maxWidth="md" sx={{ my: 5, }}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Find Your Perfect Plan
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={4}
        >
          Find the perfect plan to support your learning journey. Our pricing options are thoughtfully designed to fit the needs of students.
        </Typography>
        <Grid container spacing={4}>
          {subscriptionPlans?.map((plan, idx) => (
            <Grid size={{ xs: 12, sm: 4 }} key={idx}>
              {console.log(plan, "plan")
              }
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: theme.card.pricingcardBorder,
                  backgroundColor: theme.card.bgcolor,
                  boxShadow: theme.card.pricingboxShadow,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 2
                }}
              >
                <CardContent sx={{ flexGrow: 1, }}>
                  <Box
                    component="img"
                    src="/images/SubscriptionHeaderIcon.svg"
                    alt="Subscription Icon"
                    sx={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      mb: 2,
                    }}
                  >
                  </Box>
                  <Typography variant="h6" align="left" fontWeight={600}>
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    color="text.secondary"
                    my={1}
                  >
                    Unleash the Power of Your Learning Journey Pro Plan.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h4"
                      align="left"
                      sx={{ color: "#f6b800", fontWeight: 700, mb: 1 }}
                    >
                      ₹{plan.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="left"
                      color="text.secondary"
                    >
                      {plan?.days === "1 year" ? "per year" : plan.days}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <List dense sx={{ px: 0 }}>
                    {plan.benefits.map((item, i) => (
                      <ListItem
                        key={i}
                        disablePadding
                        sx={{ fontSize: "14px", py: 0.5 }}
                      >
                        ✔ {item}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleSubscription(plan)}
                    sx={{
                      borderColor: "#f6b800",
                      color: "#f6b800",
                      px: 4,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {!token ? "Login to subscribe the plan" : "Get Started"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Phone Number Modal */}
      <Dialog open={phoneModalOpen} onClose={() => setPhoneModalOpen(false)}>
        <DialogTitle>Enter Your Phone Number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            inputProps={{ maxLength: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000000" }} onClick={() => setPhoneModalOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "#EAB308" }} onClick={handlePhoneSubmit}>Proceed to Pay</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscription;
