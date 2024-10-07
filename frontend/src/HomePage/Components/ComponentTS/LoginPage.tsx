import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser, reset } from "../../../features/authSlice";
import { RootState } from '../../../app/store'; // Import RootState from Redux store

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch<any>(); // Add 'any' type to avoid type errors with dispatch

    // Get auth state from Redux store
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/userList");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div>
            <form onSubmit={handleLogin} className='box-11'>
                <div className="columns">
                    <div className="column is-6">
                        <h1 className="title">Login</h1>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input
                                    type="text"
                                    className="inputLog"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <span className="icon is-small is-left">
                                    {/* Add icon here if necessary */}
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input
                                    type="password"
                                    className="inputLog"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                />
                                <span className="icon is-small is-left">
                                    {/* Add icon here if necessary */}
                                </span>
                            </div>
                        </div>
                        {isError && <p className="help is-danger">{message}</p>}
                        <div className="field mt-5">
                            <button type="submit" className="button is-success is-fullwidth">
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </div>
                        <div className="field mt-3">
                            <button type="button" className="button is-link is-fullwidth is-success" onClick={() => navigate("/signIn")}>
                                Sign In
                            </button>
                        </div>
                        <NavLink className='forget-password' to={"/changePassword"}>Did you forget your password?</NavLink>
                    </div>
                    <div className="column is-6">
                        <img src={"path_to_your_image"} alt="Gambar" style={{ width: "100%", maxWidth: "900px" }} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
