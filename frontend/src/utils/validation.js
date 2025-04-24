export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
};

export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
};

export const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be less than 20 characters";
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) return "Username can only contain letters, numbers, and underscores";
    return "";
};

export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "Phone number is required";
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) return "Please enter a valid phone number";
    return "";
};

export const validateField = (field, value) => {
    switch (field) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        case "username":
            return validateUsername(value);
        case "phoneNumber":
            return validatePhoneNumber(value);
        default:
            return "";
    }
};

export const validateForm = (formData) => {
    const errors = {};
    if (formData.email) errors.email = validateEmail(formData.email);
    if (formData.password) errors.password = validatePassword(formData.password);
    if (formData.username) errors.username = validateUsername(formData.username);
    if (formData.phoneNumber) errors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    return errors;
};

export const hasErrors = (errors) => {
    return Object.values(errors).some(error => error !== "");
};