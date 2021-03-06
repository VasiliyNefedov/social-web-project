import React from "react";
import style from "./login.module.css";
import {Field, reduxForm} from "redux-form";
import {setLogin} from "../../redux/authReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {withProfileRedirect} from "../../hoc/withProfileRedirect";
import Preloader from "../../common/preloader/preloader";
import {maxLengthCreator, minLengthCreator, requiredField} from "../../utils/validators/validatorLogin";

class Login extends React.Component {
    onSubmit = formData => {
        return this.props.setLogin(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        );
    };

    render() {
        return (
            <div className={style.login}>
                <h1>Login</h1>
                {!this.props.isFetching ? (
                    <LoginReduxForm
                        onSubmit={this.onSubmit}
                        captchaURL={this.props.captchaURL}
                    />
                ) : (
                    <Preloader/>
                )}
            </div>
        );
    }
}

const maxLengthEmail = maxLengthCreator(40);
const maxLengthPassword = maxLengthCreator(16);
const minLengthPassword = minLengthCreator(4);

const renderField = ({
                         input,
                         placeholder,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div>
        {touched && error && <div className={style.errorMessage}>{error}</div>}
        <input
            type={type}
            {...input}
            placeholder={placeholder}
            className={style.inputText + " " + (touched && error && style.error)}
        />
    </div>
);

const LoginForm = ({handleSubmit, error, captchaURL}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span>Email:</span>
                <Field
                    type="text"
                    name={"email"}
                    validate={[requiredField, maxLengthEmail]}
                    component={renderField}
                />
            </div>
            <div>
                <span>Password:</span>
                <Field
                    type="password"
                    name={"password"}
                    validate={[requiredField, maxLengthPassword, minLengthPassword]}
                    component={renderField}
                />
            </div>
            <div className={style.checkboxAndButton}>
                <Field type={"checkbox"} component={"input"} name={"rememberMe"}/>{" "}
                remember me <button>Login</button>
                {error && <div>{error}</div>}
            </div>
            {captchaURL && (
                <div>
                    <img alt="" src={captchaURL}/>
                    <Field
                        type='text'
                        name="captcha"
                        component={renderField}
                        validate={[requiredField]}
                    />
                </div>
            )}
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
    isFetching: state.auth.isFetching
});

export default compose(
    connect(mapStateToProps, {setLogin}),
    withProfileRedirect
)(Login);
