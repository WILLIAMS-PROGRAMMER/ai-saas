"use client";

import Heading from "@/components/Heading";
import { useProModal } from "@/hooks/use-pro-modal";

import axios from "axios";
import { Loader, Music3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const MusicPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [music, setMusic] = useState<string>();
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
            setMusic(undefined);

            const response = await axios.post('/api/music', {
                prompt: inputValue,
            });
            setMusic(response.data.audio);
          
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

    return ( 
        <div>
            <Heading title="Music Generator" description="Our most advanced music model" icon={Music3} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
            <div className="px-4 lg:px-8">
                <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col gap-4 md:flex-row items-center justify-between ">
                    <div className="w-full">
                        <input
                            disabled={false}
                            type="text"
                            placeholder="Piano solo in C major..."
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
                    {!music && (
                        <>
                        <div className="text-center text-muted-foreground">
                            <p>WilliamsAI is ready to generate music for you</p>
                            <p>Just type a prompt and click on Generate</p>
                        </div>
                        <img src="https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif" alt="" className=" w-[400px] m-auto" />
                        </>
                    )}
                  { music && (
                    <audio controls className="w-full mt-8">
                        <source src={music} />
                    </audio>
                  )
                  }
                </div>
            </div>
           
        </div>
     );
}
 
export default MusicPage;