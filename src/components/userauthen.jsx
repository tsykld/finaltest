import { Input, Button, Link } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import './fb.css'
import '../index.css'
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EyeFilledIcon } from "./icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icon/EyeSlashFilledIcon";


export default function LoginForm() {

    const { register , handleSubmit, setError, formState: {errors} } = useForm();
    const [value, setValue] = useState("");
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

   /* const fetchUser = async (data) => {
        try {
            const response = await axios.get('https://dustin-social.onrender.com/users');
            const user = response.data;
            
            if (user.username === data.username && user.password === data.password) {
                
            } 
        } catch (err) {
            setError("general", {
                type: "manual",
                message: "ID hoặc mật khẩu không đúng. Vui lòng thử lại."
            });
        }
    }*/

    const onSubmit = data => {
        // fetchUser(data)
        navigate('/homepage')
        console.log(data);
    }

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="my-20 flex justify-center py-20">

            <div className="mr-20">
                <div className="text-blue-700 font-bold text-7xl">facebook</div>
                <p className="max-w-md text-xl">Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</p>
            </div>

          <div className="">
            <Card className='register-box max-w-md mb-5 pt-5 pb-8'>
                <div className='username mx-auto'>
                    <Input 
                        {...register('username', {
                            required: "Vui lòng nhập ID của bạn",
                        })}
                        placeholder="ID"
                        variant="bordered"
                        isClearable
                        onClear={() => setValue('')}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        color={errors.username ? "danger" : "default"}
                        fullWidth
                        className="max-w-sm mx-auto"
                    />
                    {errors.username && <div className="text-sm ml-3" style={{ color: "red" }}>{errors.username.message}</div>}

                </div>

                <div className='password mx-auto mb-5'>               
                    <Input 
                        {...register('password', {
                            required: "Vui lòng nhập mật khẩu của bạn",
                            minLength: {
                                value: 6,
                                message: "Mật khẩu cần tối thiểu 6 ký tự"
                            }
                        })}
                        placeholder="Mật khẩu"
                        variant="bordered"
                        endContent={
                            password && (
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                </button>
                             )
                            }
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        color={errors.password ? "danger" : "default"}
                        className="max-w-sm"
                    />
                    {errors.password && <div className="text-sm ml-3" style={{ color: "red" }}>{errors.password.message}</div>}

                </div>

                <Button type='submit' variant="contained" className='register-button bg-blue-700 max-w-sm mx-auto mb-2 text-white font-bold text-md'>
                    Đăng nhập
                </Button>

                {errors.general && <div className="my-3 text-sm" style={{ color: "red", textAlign: "center" }}>{errors.general.message}</div>}

                <div className="mx-auto">
                    <Link href="#" className="hover:underline my-2 text-sm" >Quên mật khẩu?</Link>
                </div>

                <hr className="w-48 h-px mx-auto bg-gray-300 border-0 rounded my-3"></hr>

                <Button className='max-w-40 mx-auto mt-3 text-white font-bold bg-green-600'>Tạo tài khoản mới</Button>
            </Card>

            <div className="max-w-xs text-center text-sm">
                <Link href='#' className="hover:underline text-black text-sm font-bold">Tạo trang</Link> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
            </div>
            
          </div>
            
            
        </form>
    )
}


