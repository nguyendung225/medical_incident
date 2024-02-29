/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from '../core/_requests'
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useAuth } from '../core/Auth'
import { UserModelLogin } from '../core/_models';
import "../authLayout.scss"
import { Form } from 'react-bootstrap'
import useMultiLanguage from '../../../hook/useMultiLanguage'
import { setSubMenu } from '../core/AuthHelpers'

interface MyJwtPayload extends JwtPayload {
  authorities: string[];
}

export function Login() {
  const { lang } = useMultiLanguage();
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const [loginUser, setLoginUser] = useState<{ username: string, password: string; }>({ username: "", password: "" })

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, lang("VALIDATION.3MIN"))
      .max(50, lang("VALIDATION.50MAX"))
      .required(lang("VALIDATE.REQUIRED")),
    password: Yup.string()
      .min(3, lang("VALIDATION.3MIN"))
      .max(50, lang("VALIDATION.50MAX"))
      .required(lang("VALIDATE.REQUIRED")),
  })

  const formik = useFormik({
    initialValues: loginUser,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await login(values.username, values.password)
        saveAuth(auth)
        const dataUser = jwt_decode(auth.access_token) as {
          user: UserModelLogin;
          authorities: string[]
        }

        if (dataUser?.authorities) {
          const permissionObj: { [key: string]: boolean; } = {};
          for (const permission of dataUser.authorities) {
            permissionObj[permission] = true;
          }
          localStorage.setItem("authorities", JSON.stringify(permissionObj));
        };
        setSubMenu()
        setCurrentUser(dataUser.user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('Tài khoản hoặc mật khẩu không chính xác, vui lòng nhập lại')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const handleInputChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
    setLoginUser((prevLoginUser) => ({
      ...prevLoginUser,
      [fieldName]: value,
    }));
  };

  return (
    <form
      className='form w-100 login-form'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-11'>
        <h1 className='text-light fw-bolder login-header'>Đăng nhập</h1>
      </div>
      {formik.status && (
        <div className='alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      <div className='input-wrapper'>
        <input
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent input-field icon-username',
            {
              'is-invalid': formik.touched.username && formik.errors.username,
            },
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          value={loginUser.username}
          type='email'
          name='email'
          placeholder='Tên tài khoản / email'
          autoComplete='off'
          onChange={(e) => handleInputChange('username', e.target.value)}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert warn-text'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>
      <div className='input-wrapper'>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          placeholder='Mật khẩu'
          className={clsx(
            'form-control bg-transparent input-field icon-password',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
          value={loginUser.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert warn-text'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='gap-3 fs-base fw-semibold switch-wrapper'>
        <Form.Check
          type='switch'
          id='custom-switch'
          label={<div className='text-light'>Tự động đăng nhập lần sau</div>}
        />
      </div>
      <div className='d-flex flex-space-between flex-middle justify-between align-center'>
        <Link to='/auth/forgot-password' className='text-light forgot-password'>
          Quên mật khẩu ?
        </Link>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='button-primary login-submit'
        >
          {!loading && <span className='indicator-label'>Đăng nhập</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Vui lòng chờ một lát...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
