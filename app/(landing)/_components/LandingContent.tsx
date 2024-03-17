"use client"
const testimonials = [
    {
        name: "John Doe",
        title: "CEO",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Jane Doe",
        title: "CTO",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "John Smith",
        title: "CFO",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Jane Smith",
        title: "COO",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }

]
export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                        <p className="text-gray-600">{testimonial.content}</p>
                        <h3 className="text-gray-800 font-bold mt-4">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}