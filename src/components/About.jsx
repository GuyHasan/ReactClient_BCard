import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

function About() {
	const { theme } = useContext(ThemeContext);
	return (
		<>
			<div className={`container w-100 text-center mt-4 d-flex flex-column align-items-center gap-4 ${theme}`}>
				<h1 className='title display-3 fw-bold'>About Us</h1>
				<div className={`p-4 rounded shadow-sm ${theme === "dark" ? "bg-dark bg-gradient text-light" : "bg-light text-dark"}`}>
					<h4 className='text-info'>The Idea</h4>
					<p>
						The idea for this platform originated from a group of passionate entrepreneurs who wanted to create an accessible space for businesses to establish their online presence. We continuously update our features to ensure they
						remain relevant and valuable. Our mission is to provide a comprehensive platform where businesses can easily create and manage their online pages, enhancing their accessibility and reach. We believe in the power of technology
						and innovation, and we strive to foster an environment that encourages growth and success. Thank you for choosing our platform, and we hope it helps you achieve your business goals.
					</p>
				</div>
				<div className={`p-4 rounded shadow-sm ${theme === "dark" ? "bg-dark bg-gradient text-light" : "bg-light text-dark"}`}>
					<h4 className='text-info'>How It Started?</h4>
					<p>
						Founded in 2024, this platform was created to provide businesses with an easy-to-use tool for establishing their online presence. Our goal is to offer high-quality features and support that cater to both small and large
						businesses. We believe that creating an online page should be accessible and straightforward for everyone. Our team of experts is dedicated to developing features that are both powerful and user-friendly, ensuring that
						businesses can effectively manage their online presence. From the very beginning, our focus has been on delivering value and making a positive impact on the business community.
					</p>
				</div>
				<div className={`p-4 rounded shadow-sm ${theme === "dark" ? "bg-dark bg-gradient text-light" : "bg-light text-dark"}`}>
					<h4 className='text-info'>Today</h4>
					<p>
						Today, our platform is a leading solution for businesses looking to establish and manage their online presence. Our goal is to offer high-quality resources and tools that cater to businesses of all sizes. We believe that
						creating and managing an online page should be accessible and enjoyable for everyone. The idea for this platform originated from a group of passionate entrepreneurs who wanted to share their knowledge and experience with the
						business community. We continuously update our features to ensure they remain relevant and valuable. Our platform covers a wide range of functionalities, from basic page creation to advanced management tools, providing a
						well-rounded experience. Today, we are proud to have a growing community of users and contributors who make this platform vibrant and dynamic. Thank you for choosing our platform, and we hope it helps you achieve your business
						goals. If you have any questions or feedback, please do not hesitate to reach out to us.
					</p>
				</div>
				<p className='spacerFromFooter mt-5'></p>
			</div>
		</>
	);
}

export default About;
