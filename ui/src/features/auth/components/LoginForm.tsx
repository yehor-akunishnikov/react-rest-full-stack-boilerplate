import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { z } from "zod/v4";

import type { LoginSuccessResponse } from "../../../data/rest/auth/types";
import * as authRestService from "../../../data/rest/auth/service";
import { useAsyncCall } from "../../../common/hooks/useAsyncCall";
import { AUTH_TOKEN_KEY } from "../../../common/constants/http";

type LoginFormInputs = {
  email: string;
  password: string;
};

const validator = z.strictObject({
  email: z.email({ error: "Invalid email" }),
  password: z.string().nonempty({ error: "Required" }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { isLoading, callApi } = useAsyncCall<LoginSuccessResponse>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(validator),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    await callApi(async () => {
      const res = await authRestService.login(formData);

      if (res.isFailed) {
        throw res.error;
      } else {
        localStorage.setItem(AUTH_TOKEN_KEY, res.data.token);

        navigate("/");

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
        <h1 className="mb-3 mb-lg-4 fs-3 text-center">Login</h1>
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
        Login
      </Button>

      <p className="m-0 text-center">Don't have an account yet?</p>
      <Link
        className="d-block text-center"
        to="/auth/register"
      >
        Register
      </Link>
    </form>
  );
}
