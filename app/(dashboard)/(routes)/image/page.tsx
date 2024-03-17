"use client";

import { BotAvatar } from "@/components/BotAvatar";
import Heading from "@/components/Heading";
import { UserAvatar } from "@/components/UserAvatar";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import { ImageUpIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const amountOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
];

const resolutionOptions = [
    { value: "256x256", label: "256x256" },
    { value: "512x512", label: "512x512" },
    { value: "1024x1024", label: "1024x1024" },
    { value: "2048x2048", label: "2048x2048" },
    { value: "4096x4096", label: "4096x4096" },
];


const ImagePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [amount, setAmount] = useState('1');
    const [resolution, setResolution] = useState('512x512');

    const [error, setError] = useState('');
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const proModal = useProModal();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // Validar si el campo está vacío
        if (inputValue.trim() === '') {
        setError('Image Prompt es requerido');
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
        console.log(amount);
        console.log(resolution);
        // Reiniciar el estado de error
        setError('');
        //este try catch es para llamar api de openai
        try {
            setIsLoading(true);
            setImages([]);
            const response = await axios.post('/api/image', {
               
                    prompt: inputValue,
                    amount,
                    resolution,
                
            });
            console.log(response.data,"reponse data");
            const urls = response.data;
            const urlsStringArray = urls.map((item:any) => item.url);
            // const urlsArray = urls.split(',');
            setImages(urlsStringArray);
            console.log(images);

        } catch (error:any) {
            if(error?.response?.status === 403){
                setError("WilliamsAI credits have expired");
                proModal.onOpen();
            }else {
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

    const handleAmountChange = (e:any) => {
        setAmount(e.target.value);
    };

    const handleResolutionChange = (e:any) => {
        setResolution(e.target.value);
    };

    return ( 
        <div>
            <Heading title="Image generation" description="Turn your prompt into an image" icon={ImageUpIcon} iconColor="text-pink-700" bgColor="bg-pink-700/10" />
            <div className="px-4 lg:px-8">
                <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col gap-4 md:flex-row items-center justify-between ">
                    <div className="w-full">
                        <input
                            disabled={false}
                            type="text"
                            placeholder="A picture of a whale in the space..."
                            value={inputValue}
                            onChange={handleChange}
                            className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                    
                    <button disabled={false} className=" bg-slate-500 rounded-xl p-2 text-white w-full md:w-28" type="submit">Generate</button> 
                </form>

                <div className="flex justify-between">
                     <select className="mt-4 border-slate-600 bg-blue-500 rounded-full text-white h-8 w-[90px] p-1 text-center" value={amount} onChange={handleAmountChange}>
                        <option value="">Select the number of images to generate</option>
                        {amountOptions.map((option) => (
                            <option className=" text-left" key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </select>

                    <select className="mt-4 border-slate-600 bg-blue-500 rounded-full text-white h-8 w-[190px] p-1 text-center" value={resolution} onChange={handleResolutionChange}>
                        <option value="">Select the resolution you want</option>
                        {resolutionOptions.map((option) => (
                            <option className=" text-left" key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </select>
                </div>
               

                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="text-center">
                                <Loader size={30} className="animate-spin text-blue-700" />
                                <p className="font-bold text-3xl">WilliamsAI is thinking...</p>
                            </div>
                        )
                    }
                    {images.length === 0 && (
                        <>
                        <div className="text-center text-muted-foreground">
                            Enter a prompt to generate an image!!!
                        </div>
                        <img src="https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif" alt="" className=" w-[400px] m-auto" />
                        </>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((image) => (
                            <Link href={image} target="_blank" key={image} className="rounded-lg">
                                <div key={image} className="rounded-lg overflow-hidden hover:scale-110 transition-all">
                                   <img src={image} alt="image openai" className="w-full" />
                                </div>
                            </Link>
                          
                        ))}
                    </div>
                   
                </div>
            </div>
           
        </div>
     );
}
 
export default ImagePage;