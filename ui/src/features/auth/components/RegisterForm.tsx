import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { z } from "zod/v4";

import type { RegisterSuccessResponse } from "../../../data/rest/auth/types";
import * as authRestService from "../../../data/rest/auth/service";
import { useAsyncCall } from "../../../common/hooks/useAsyncCall";

type RegisterFormInputs = {
  email: string;
  name: string;
  password: string;
};

const validator = z.strictObject({
  email: z.email({ error: "Invalid email" }),
  name: z.string().nonempty({ error: "Required" }).max(12, { error: "Too long" }),
  password: z
    .string()
    .nonempty({ error: "Required" })
    .refine(
      (val: string) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
      { error: "Too weak" },
    ),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const { isLoading, callApi } = useAsyncCall<RegisterSuccessResponse>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(validator),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (formData) => {
    await callApi(async () => {
      const res = await authRestService.register(formData);

      if (res.isFailed) {
        throw res.error;
      } else {
        navigate("/auth/login");

        return res.data;
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <h1 className="mb-3 mb-lg-4 fs-3 text-center">Register</h1>
      </div>

      <div className="mb-4">
        <Form.Group
          className="mb-3"
          controlId="email"
        >
          <Form.Label>Email address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              {...register("email")}
              autoComplete="on"
              isInvalid={!!errors.email}
              type="text"
              placeholder="name@example.com"
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="name"
        >
          <Form.Label>Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              {...register("name")}
              autoComplete="on"
              isInvalid={!!errors.name}
              type="text"
              placeholder="Some name"
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              {...register("password")}
              isInvalid={!!errors.password}
              type="password"
              placeholder="********"
            />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-100 mb-3"
      >
        Register
      </Button>

      <p className="text-center m-0">Already have an account?</p>
      <Link
        className="d-block text-center"
        to="/auth/login"
      >
        Login
      </Link>
    </form>
  );
}
