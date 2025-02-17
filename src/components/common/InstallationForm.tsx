import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import style from "./style.module.css";
import { IoChevronDown } from "react-icons/io5";
import { useTranslations } from 'next-intl';

const InstallationForm: React.FC = () => {
    const t = useTranslations('installation.form');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [service, setService] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [errors, setErrors] = useState<{
        Name?: string;
        email?: string;
        Phone?: string;
        comment?: string;
        service?: string;
        industryType?: string;
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const validateForm = () => {
        const newErrors: {
            Name?: string;
            email?: string;
            Phone?: string;
            comment?: string;
            service?: string;
            industryType?: string;
        } = {};

        // Name validation
        if (!Name) {
            newErrors.Name = `${t("validation.nameRequired")}`;
        }

        // Email validation
        if (!email) {
            newErrors.email = `${t("validation.emailRequired")}`;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = `${t("validation.emailInvalid")}`;
        }

        // Phone validation
        if (!Phone) {
            newErrors.Phone = `${t("validation.phoneRequired")}`;
        }

        // Comment validation
        if (!comment) {
            newErrors.comment = `${t("validation.commentRequired")}`;
        }

        // Service validation
        if (!service) {
            newErrors.service = `${t("validation.serviceRequired")}`;
        }

        // Industry Type validation
        if (!industryType) {
            newErrors.industryType = `${t("validation.industryRequired")}`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}contact-uses`,
                {
                    data: {
                        name: Name,
                        email: email,
                        phone: Phone,
                        service: service,
                        industry_type: industryType,
                        comments: comment,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                }
            );
            const emailData = {
                name: Name,
                email: email,
                phone: Phone,
                service: service,
                industry_type: industryType,
                comments: comment,
              }
        
              await fetch('/api/installation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
              });
            enqueueSnackbar(`${t("successToast")}`, { variant: 'success' });

            // Reset form fields
            setName('');
            setEmail('');
            setPhone('');
            setService('');
            setIndustryType('');
            setComment('');
        } catch (error) {
            console.error('Error submitting the form:', error);

            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    `${t("errorToast")}`;
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } else {
                enqueueSnackbar(`${t("errorToast2")}`, {
                    variant: 'error',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className={style["contact_form_container"]}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className={style["contact_form"]}>
                                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <h2 className='text-center'>{t("heading")}</h2>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <input
                                                    type="text"
                                                    id="Name"
                                                    className={`form-control ${style.inputField} ${errors.Name ? style.errorInput : ''}`}
                                                    placeholder={t("placeHolders.name")}
                                                    value={Name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    aria-invalid={errors.Name ? "true" : "false"}
                                                    aria-describedby="Name-error"
                                                />
                                                {errors.Name && (
                                                    <p
                                                        id="Name-error"
                                                        className={style.error}
                                                    >
                                                        {errors.Name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <input
                                                    type="text" // Changed from "email" to "text"
                                                    id="Email"
                                                    className={`form-control ${style.inputField} ${errors.email ? style.errorInput : ''}`}
                                                    placeholder={t("placeHolders.email")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    aria-invalid={errors.email ? "true" : "false"}
                                                    aria-describedby="email-error"
                                                    autoComplete="off" // Optional: To disable autocomplete suggestions
                                                />
                                                {errors.email && (
                                                    <p id="email-error" className={style.error}>
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <input
                                                    type="text" // Still using "text" for complete control
                                                    id="Phone"
                                                    className={`form-control ${style.inputField} ${errors.Phone ? style.errorInput : ''}`}
                                                    placeholder={t("placeHolders.phone")}
                                                    value={Phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault(); // Block non-numeric characters
                                                        }
                                                    }}
                                                    aria-invalid={errors.Phone ? "true" : "false"}
                                                    aria-describedby="Phone-error"
                                                />
                                                {errors.Phone && (
                                                    <p id="Phone-error" className={style.error}>
                                                        {errors.Phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <div className="position-relative">
                                                    <select
                                                        className={`form-control ${style.inputField} ${errors.service ? style.errorInput : ''}`}
                                                        value={service}
                                                        onChange={(e) => setService(e.target.value)}
                                                        aria-invalid={errors.service ? "true" : "false"}
                                                        aria-describedby="service-error"
                                                    >
                                                        <option value="">{t("placeHolders.service.default")}</option>
                                                        <option value="Sale">{t("placeHolders.service.sale")}</option>
                                                        <option value="Rent">{t("placeHolders.service.rent")}</option>
                                                        <option value="Career">{t("placeHolders.service.career")}</option>
                                                        <option value="Other">{t("placeHolders.service.other")}</option>
                                                    </select>
                                                    <IoChevronDown className={style.selectIcon} />
                                                </div>
                                                {errors.service && (
                                                    <p
                                                        id="service-error"
                                                        className={style.error}
                                                    >
                                                        {errors.service}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <div className="position-relative">
                                                    <select
                                                        className={`form-control ${style.inputField} ${errors.industryType ? style.errorInput : ''}`}
                                                        value={industryType}
                                                        onChange={(e) => setIndustryType(e.target.value)}
                                                        aria-invalid={errors.industryType ? "true" : "false"}
                                                        aria-describedby="industry-error"
                                                    >
                                                        <option value="">{t("placeHolders.industry.default")}</option>
                                                        <option value="Automotive">{t("placeHolders.industry.automotive")}</option>
                                                        <option value="Retail">{t("placeHolders.industry.retail")}</option>
                                                        <option value="Government">{t("placeHolders.industry.government")}</option>
                                                        <option value="Cooperate">{t("placeHolders.industry.corporate")}</option>
                                                    </select>
                                                    <IoChevronDown className={style.selectIcon} />
                                                </div>
                                                {errors.industryType && (
                                                    <p
                                                        id="industry-error"
                                                        className={style.error}
                                                    >
                                                        {errors.industryType}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className={style.formControl}>
                                                <input
                                                    type="text"
                                                    id="comment"
                                                    className={`form-control ${style.inputField} ${errors.comment ? style.errorInput : ''}`}
                                                    placeholder="Comment*"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    aria-invalid={errors.comment ? "true" : "false"}
                                                    aria-describedby="comment-error"
                                                />
                                                {errors.comment && (
                                                    <p
                                                        id="comment-error"
                                                        className={style.error}
                                                    >
                                                        {errors.comment}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className={`mt-2 ${style.form_button}`}
                                            disabled={isLoading}
                                            style={{
                                                opacity: isLoading ? 0.6 : 1,
                                                cursor: isLoading ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            {isLoading ? t("sending") : t("send")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstallationForm;
