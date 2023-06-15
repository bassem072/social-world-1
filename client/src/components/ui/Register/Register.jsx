import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../../slices/AuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import "./styles.css";

export default function Register() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [show, setShow] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!values.email) {
      errors.email = "Required";
      setIsValid(false);
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.email
      )
    ) {
      errors.email = "Invalid email address";
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    if (!values.repeatEmail) {
      errors.repeatEmail = "Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.repeatEmail
      )
    ) {
      errors.repeatEmail = "Invalid email address";
    } else if (values.email !== values.repeatEmail) {
      errors.repeatEmail = "Email and repeat email are not the same";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ).test(values.password)
    ) {
      errors.password =
        "Password must be have lowercase and uppercase and special characters and numbers and > 8 characters";
    }

    let date = new Date(values.year + "-" + values.month + "-" + values.day);

    if (!(date.getDate() === Number(values.day))) {
      errors.date = "Invalid Date";
    }

    if (!values.gender) {
      errors.gender = "Required";
    }

    return errors;
  };

  let current_day = new Date().getDate();
  var days = [];
  for (var i = 1; i < 32; i++) {
    days.push(i);
  }

  let current_month = new Date().getMonth();
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let current_year = new Date().getFullYear();
  var years = [];
  for (i = current_year; i >= current_year - 150; i--) {
    years.push(i);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      repeatEmail: "",
      password: "",
      day: current_day,
      month: current_month + 1,
      year: current_year,
      gender: 1,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      className={
        "z-10 absolute top-0 w-screen min-h-screen bg-white/80 flex justify-center py-16" +
        (!auth.isRegister ? " hidden" : "")
      }
    >
      <div className="w-[440px] bg-white pt-2 pb-4 shadow-2xl rounded-xl">
        <div className="flex justify-between px-5">
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-semibold">Sign Up</p>
            <p className="text-slate-500 text-sm">It's quick and easy.</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(change(false))}
            className="h-fit"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl text-slate-500"
            />
          </button>
        </div>
        <div className="w-full h-px bg-slate-300 my-4"></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3  px-5">
            <div className="flex gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.firstName && formik.errors.firstName
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />
                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.firstName && formik.errors.firstName
                    ? "* " + formik.errors.lastName
                    : null}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.lastName && formik.errors.lastName
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />

                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.lastName && formik.errors.lastName
                    ? "* " + formik.errors.lastName
                    : null}
                </div>
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                  (formik.touched.email && formik.errors.email
                    ? "border-red-600"
                    : "border-slate-200")
                }
              />

              <div className="h-4 pt-1 w-fit text-sm">
                {formik.touched.email && formik.errors.email
                  ? "* " + formik.errors.email
                  : null}
              </div>
            </div>
            {isValid && (
              <div>
                <input
                  type="email"
                  placeholder="Re-enter email address"
                  name="repeatEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatEmail}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.repeatEmail && formik.errors.repeatEmail
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />

                <div className="h-4 pt-1 w-fit text-sm">
                  {formik.touched.repeatEmail && formik.errors.repeatEmail
                    ? "* " + formik.errors.repeatEmail
                    : null}
                </div>
              </div>
            )}
            <div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.touched.password && formik.errors.password
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 w-[60px] h-full cursor-pointer flex justify-center items-center text-slate-700"
                  onClick={() => setShow(!show)}
                >
                  <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
                </button>
              </div>
              <div
                className={
                  "pt-1 w-fit text-sm " +
                  (formik.touched.password && formik.errors.password
                    ? "h-9"
                    : "h-4")
                }
              >
                {formik.touched.password && formik.errors.password
                  ? "* " + formik.errors.password
                  : null}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 pb-1">Date of birth</p>
              <div className="flex gap-2">
                <select
                  name="day"
                  placeholder="day"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.day}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  placeholder="Month"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {months.map((month, key) => (
                    <option key={key} value={key + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  placeholder="Year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  className={
                    "w-full border-2 rounded-md px-4 py-2 focus:outline-none " +
                    (formik.errors.date ? "border-red-600" : "border-slate-200")
                  }
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-4 pt-1 w-fit text-sm">
                {formik.errors.date ? "* " + formik.errors.date : null}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 pb-1">Gender</p>
              <div className="flex gap-2">
                <div
                  className={
                    "flex justify-between w-full border-2 rounded-md p-2 " +
                    (formik.errors.gender
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                >
                  <p>Male</p>
                  <input
                    type="radio"
                    name="gender"
                    value={1}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 1}
                  />
                </div>
                <div
                  className={
                    "flex justify-between w-full border-2 rounded-md p-2 " +
                    (formik.touched.gender && formik.errors.gender
                      ? "border-red-600"
                      : "border-slate-200")
                  }
                >
                  <p>Female</p>
                  <input
                    type="radio"
                    name="gender"
                    value={2}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 2}
                  />
                </div>
              </div>
              <div className="h-4 pt-1 w-fit text-sm">
                {formik.touched.gender && formik.errors.gender
                  ? "* " + formik.errors.gender
                  : null}
              </div>
            </div>
            <p className="text-xs text-slate-500 pb-1">
              People who use our service may have uploaded your contact
              information to Facebook.
            </p>
            <p className="text-xs text-slate-500 pb-1">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button
              type="submit"
              className="h-14 rounded-lg text-white font-bold text-xl create-button1 w-3/5 mx-auto font-['Roboto']"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
