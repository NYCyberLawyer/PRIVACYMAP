import AuthenticationForm from "../client/components/AuthenticationForm";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

function Login() {
    const router = useRouter()
    const {error} = router.query

    if (error) toast.error(`You can't use the same login link twice`, {duration: 5000})

    return (
        <>
            <AuthenticationForm/>
        </>
    );
}

export default Login;
