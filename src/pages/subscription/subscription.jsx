import { apiPost } from "../../api/axios";
import { load } from '@cashfreepayments/cashfree-js';

const plans = [
  {
    title: "Monthly Plan",
    price: "169",
    days: "30",
    subtitle: "per month",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹169 will deduct from the account",
  },
  {
    title: "6 Months Plan",
    price: "999",
    days: "180",
    subtitle: "6 Months + 1 Month",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹999 will deduct from the account",
  },
  {
    title: "Yearly Plan",
    price: "1999",
    days: "365",
    subtitle: "per Year",
    benefits: ["Tests", "Trainings", "Full Access"],
    trialText: "Get 15-day free trial (autopay)",
    cancelNote: "Cancellation: Cancel within 15 days or ₹1999 will deduct from the account",
  },
];

const Subscription = () => {

  let cashfree;
  let initializeSdk = async () => {
    cashfree = await load({
      mode: "sandbox"
    })
  }

  initializeSdk();

  const handleSubscription = async (plan) => {
    const subscriptionData =
    {
      "userId": JSON.parse(localStorage.getItem("user"))._id,
      "amount": Number(plan.price),
      "duration": Number(plan.days),
    }
    try {
      const response = await apiPost(`/subscription/createSubscriptionPayment`, subscriptionData);
      console.log("API Response:", response.data);
      if (response?.data?.message === "Subscription created successfully") {
        let order = response.data.createdOrder;
        const options = {
          paymentSessionId: order?.payment_session_id,
          redirectTarget: "_modal",
        };
        cashfree.checkout(options).then(async (data) => {
          console.log("Payment Data:", data);
          if (data) {
            console.log("Payment Successful:", data);
            // Handle successful payment
            // You can update the UI or redirect the user
            const response = await apiPost(`/subscription/verifySubscriptionPaymentStatus`, { orderId: order.order_id });

            console.log("Verify Payment Response:", response.data);
            if (response.data.message === "Payment verified successfully") {
              console.log("Payment verified successfully:", response.data);
              alert("Payment Successful!");
            }

            // Optionally, redirect or update UI
          } else {
            console.error("Payment Failed:", data);
            alert("Payment Failed. Please try again.");
          }
        }).catch((error) => {
          console.error("Payment Error:", error);
          alert("An error occurred during payment. Please try again.");
        });
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "auto", display: "flex", alignItems: "center", justifyContent: "center", }}>
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
          {plans.map((plan, idx) => (
            <Grid size={{ xs: 12, sm: 4 }} key={idx}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #E4E4E7",
                  backgroundColor: "#fff",
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
                      {plan.subtitle}
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

                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 2, fontSize: "13px", textAlign: "left" }}
                  >
                    {plan.trialText.split("free trial")[0]}
                    <span style={{ textDecoration: "underline" }}>free trial</span>
                    {plan.trialText.split("free trial")[1]}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", textAlign: "left", mt: 1.5 }}
                  >
                    {plan.cancelNote}
                  </Typography>
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
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Subscription;