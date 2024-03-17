"use client";

import { BotAvatar } from "@/components/BotAvatar";
import Heading from "@/components/Heading";
import { UserAvatar } from "@/components/UserAvatar";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import { Code, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [messages, setMessages] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const proModal = useProModal();
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // Validar si el campo está vacío
        if (inputValue.trim() === '') {
        setError('El campo no puede estar vacío');
        return;
        }

        // Validar si hay tres letras iguales consecutivas
        for (let i = 0; i < inputValue.length - 2; i++) {
            if (inputValue[i] === inputValue[i + 1] && inputValue[i] === inputValue[i + 2]) {
                setError('No puedes ingresar tres letras iguales consecutivas');
                return;
            }
        }

        // Si no hay errores, procesar el formulario
        console.log('Valor del campo:', inputValue);
        // Reiniciar el estado de error
        setError('');
        //este try catch es para llamar api de openai
        try {
            setIsLoading(true);
            const userMessage:any = {
                role: "user",
                content: inputValue
            }

            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', {
                messages: newMessages
            });

            setMessages((current:any) => [...current, userMessage, response.data]); //agregar el mensaje del usuario y el mensaje de la api
            console.log(messages,"messages");
        } catch (error:any) {
            if(error?.response?.status === 403){
                setError("WilliamsAI credits have expired");
                proModal.onOpen();
            } else {
                toast.error("An error occurred, please try again later");
            }
            console.log(error);
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    const handleChange = (e:any) => {
        setInputValue(e.target.value);
        setError('');
    };

    return ( 
        <div>
            <Heading title="Code Generation" description="Our most advanced code model" icon={Code} iconColor="text-green-700" bgColor="bg-green-700/10" />
            <div className="px-4 lg:px-8">
                <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col gap-4 md:flex-row items-center justify-between ">
                    <div className="w-full">
                        <input
                            disabled={false}
                            type="text"
                            placeholder="Write a game in c++ about a cat and a dog..."
                            value={inputValue}
                            onChange={handleChange}
                            className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                    
                    <button disabled={false} className=" bg-slate-500 rounded-xl p-2 text-white w-full md:w-28" type="submit">Generate</button> 
                </form>

                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="text-center">
                                <Loader size={30} className=" animate-spin text-blue-700" />
                                <p className="font-bold text-3xl">WilliamsAI is thinking...</p>
                            </div>
                        )
                    }
                    {messages.length === 0 && (
                        <>
                        <div className="text-center text-muted-foreground">
                            Start a conversation with Williams AI, I am sure that here is your answer
                        </div>
                        <img src="https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif" alt="" className=" w-[400px] m-auto" />
                        </>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message:any, index:any) => (
                            <div key={message.content} className={`flex flex-row gap-4 ${message.role === "user" ? " pb-2 border-b-4" : ""}`}>
                                <div className="font-bold">
                                    {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                    {/* {message.role.charAt(0).toUpperCase() + message.role.slice(1)} */}
                                </div>
                               
                                <ReactMarkdown components={{
                                    pre:({node, ...props}) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({node, ...props}) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                    
                                }} className="text-sm overflow-hidden leading-7">{message.content}</ReactMarkdown>
                               
                            </div>
                         
                        ))}
                    </div>
                </div>
            </div>
           
        </div>
     );
}
 
export default CodePage;