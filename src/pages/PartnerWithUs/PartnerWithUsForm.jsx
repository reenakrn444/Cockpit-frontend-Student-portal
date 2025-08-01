import formFields from "./partnerFormFieldsArray";
import { apiPostToken } from "../../api/axios";

const initialFormData = formFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
}, {});

const propsStyle = {
    sx: {
        borderRadius: "12px",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#797676",
        },
    },
};

const PartnerWithUsForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        const field = formFields.find((f) => f.name === name);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (field?.required && !value.trim()) {
            return "This field is required";
        }

        if (name === "email" && value.trim() && !emailRegex.test(value)) {
            return "Please enter a valid email address";
        }

        return "";
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach((field) => {
            const error = validateField(field.name, formData[field.name]);
            if (error) {
                newErrors[field.name] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const submitFormData = async () => {
        console.log("Submitting to API:", formData);
       const response =  await apiPostToken('/registerPartner', formData);
       console.log(response, "responseData");
       

    };

    const handleSubmit = () => {
        if (validateForm()) {
            submitFormData();
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography
                variant="h4"
                fontWeight={600}
                fontSize="48px"
                fontFamily="Exo"
                color="#183251"
            >
                Welcome To Cockpit — Partner With Us!
            </Typography>
            <Typography
                variant="body1"
                sx={{ mb: 4, width: "100%", maxWidth: "700px" }}
            >
                Elevate aviation education at your institution with our comprehensive
                training platform designed specifically for aspiring pilots and aviation
                professionals.
            </Typography>

            <Grid container spacing={3}>
                {formFields.map((field) => (
                    <Grid size={{ xs: 12 }} key={field.name}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography fontSize={16} fontWeight={500} color="#797676">
                                {field.label}
                            </Typography>
                            <TextField
                                name={field.name}
                                placeholder={field.label}
                                value={formData[field.name]}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                                variant="outlined"
                                multiline={field.type === "multiline"}
                                minRows={field.type === "multiline" ? 4 : undefined}
                                select={field.type === "select"}
                                InputProps={propsStyle}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                            >
                                {field.type === "select" &&
                                    field.options?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Box>
                    </Grid>
                ))}

                <Grid size={{ xs: 12 }} textAlign="center">
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#EAB308",
                            color: "#ffffff",
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                        }}
                    >
                        Submit Partnership Inquiry
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PartnerWithUsForm;
