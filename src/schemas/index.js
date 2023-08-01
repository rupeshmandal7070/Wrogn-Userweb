import * as Yup from "yup"

export const signupSchema = Yup.object({
    firstName: Yup.string().min(2).max(20).required("Please Enter Firstname"),
    lastName: Yup.string().min(2).max(20).required("Please Enter Firstname"),
    email: Yup.string().email().required("Please Enter Email"),
    phone: Yup.number().min(1000000000).max(9999999990).required(" Enter a Valid Number"),
    password: Yup.string().min(6).max(10).required("Please Enter Password"),
    date: Yup.string().required('Please Enter DOB'),
    sex: Yup.string().required("Please Enter Sex")
})
