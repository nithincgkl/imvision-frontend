import React, { useState } from "react";
import styles from "./style.module.css";

const InstallationForm: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formErrors: { [key: string]: string } = {};
        const form = event.currentTarget;

        const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
        const phone = (form.elements.namedItem("Phone") as HTMLInputElement)?.value.trim();
        const company = (form.elements.namedItem("company") as HTMLInputElement)?.value.trim();
        const address = (form.elements.namedItem("address") as HTMLInputElement)?.value.trim();
        const comments = (form.elements.namedItem("comments") as HTMLInputElement)?.value.trim();

        // Validate Name
        if (!name) {
            formErrors.name = "Name is required.";
        }

        // Validate Email
        if (!email) {
            formErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email is invalid.";
        }

        // Validate Phone
        if (!phone) {
            formErrors.phone = "Phone number is required.";
        } else if (!/^\d+$/.test(phone)) {
            formErrors.phone = "Phone number must contain only digits.";
        }

        // Validate Company
        if (!company) {
            formErrors.company = "Company/Business Name is required.";
        }

        // Validate Address
        if (!address) {
            formErrors.address = "Address & City is required.";
        }

        if (!comments) {
            formErrors.comments = "Any Specific Comment?";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});

        }
    };


    return (
        <>
            <section className={styles["instructions_form"]}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">Contact Support</h2>
                        </div>
                        <div className="col-md-12">
                            <form
                                className={styles["installation-form"]}
                                onSubmit={validateForm}
                                noValidate
                            >
                                <div className="row">
                                    {/* First Row */}
                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="text"
                                                id="name"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Name*"
                                            />
                                            {errors.name && (
                                                <span className={styles.error}>{errors.name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="email"
                                                id="email"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Email*"
                                            />
                                            {errors.email && (
                                                <span className={styles.error}>{errors.email}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Second Row */}
                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="tel"
                                                id="Phone"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Phone*"
                                                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                    const target = e.target as HTMLInputElement; // Explicitly typing as HTMLInputElement
                                                    target.value = target.value.replace(/[^0-9]/g, '');
                                                }}
                                            />
                                            {errors.phone && (
                                                <span className={styles.error}>{errors.phone}</span>
                                            )}
                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="text"
                                                id="company"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Company/Business Name*"
                                            />
                                            {errors.company && (
                                                <span className={styles.error}>
                                                    {errors.company}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Third Row */}
                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="text"
                                                id="address"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Address & City*"
                                            />
                                            {errors.address && (
                                                <span className={styles.error}>{errors.address}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.formControl}>
                                            <input
                                                type="text"
                                                id="comments"
                                                className={`form-control ${styles.inputField}`}
                                                placeholder="Any Specific Comment?"
                                            />
                                            {errors.comments && (
                                                <span className={styles.error}>
                                                    {errors.comments}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Fourth Row - Submit Button */}
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className={`${styles["submit-button"]} ${styles["send-button"]}`}
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InstallationForm;
