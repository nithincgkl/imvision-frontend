import event_img_1 from "@/assets/img/project_successfull_1.jpg";
import event_img_2 from "@/assets/img/project_successfull_2.jpg";
import event_img_3 from "@/assets/img/project_successfull_3.jpg";
import event_img_4 from "@/assets/img/project_successfull_4.jpg";
import event_img_5 from "@/assets/img/project_successfull_5.jpg";
import event_img_6 from "@/assets/img/project_successfull_6.jpg";
import event_img_7 from "@/assets/img/project_successfull_7.jpg";
import event_img_8 from "@/assets/img/project_successfull_8.jpg";
import event_img_9 from "@/assets/img/project_successfull_9.jpg";
import event_img_10 from "@/assets/img/project_successfull_10.jpg";
import { StaticImageData } from "next/image";


interface eventDataType {
	id: number;
	img: StaticImageData;
	title: string;
	des: string;
}

const event_data: eventDataType[] = [
	{
		id: 1,
		img: event_img_1,
		title: "Project Task Management",
		des: "5555Digital Services / App Design",
	},
	{
		id: 2,
		img: event_img_2,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 3,
		img: event_img_3,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 4,
		img: event_img_4,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 5,
		img: event_img_5,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},	 
	{
		id: 6,
		img: event_img_6,
		title: "Project Task Management",
		des: "5555Digital Services / App Design",
	},
	{
		id: 7,
		img: event_img_7,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 8,
		img: event_img_8,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 9,
		img: event_img_9,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},
	{
		id: 10,
		img: event_img_10,
		title: "Project Task Management",
		des: "Digital Services / App Design",
	},

];

export default event_data;
