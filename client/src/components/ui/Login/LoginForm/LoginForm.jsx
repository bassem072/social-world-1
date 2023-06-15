import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useFormik } from "formik";
import "./styles.css";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

export default function LoginForm() {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="flex flex-col gap-y-3.5" onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={
            "w-full border-2 rounded-md p-4 focus:outline-none " +
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
      <div>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={
              "w-full border-2 rounded-md p-4 focus:outline-none " +
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
        <div className="h-4 pt-1 w-fit text-sm text-red-600">
          {formik.touched.password && formik.errors.password
            ? "* " + formik.errors.password
            : null}
        </div>
      </div>
      <button
        type="submit"
        className="h-14 rounded-lg text-white font-bold text-xl bg-blue-500 font-['Roboto']"
      >
        Log in
      </button>
    </form>
  );
}
