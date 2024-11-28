import React from "react";
import styles from "./style.module.css";

const InstallationForm: React.FC = () => {
    return (
        <>
            <section className={styles["instructions_form"]}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12"><h2 className="text-center">Contact Support</h2></div>
                        <div className="col-md-12">
                            <form className={styles["installation-form"]}>
                                <div className="row">
                                    {/* First Row */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name*"
                                            className={styles["form-input"]}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email*"
                                            className={styles["form-input"]}
                                            required
                                        />
                                    </div>

                                    {/* Second Row */}
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone*"
                                            className={styles["form-input"]}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Company/Business Name*"
                                            className={styles["form-input"]}
                                            required
                                        />
                                    </div>

                                    {/* Third Row */}
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Address & City*"
                                            className={styles["form-input"]}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            id="comments"
                                            name="comments"
                                            placeholder="Any Specific Comment?"
                                            className={styles["form-input"]}
                                        />
                                    </div>

                                    {/* Fourth Row - Submit Button */}
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className={styles["submit-button"]}
                                        >
                                            Submit
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
