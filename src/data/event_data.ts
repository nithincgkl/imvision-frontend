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
		title: "Titlet",
		des: "Description",
	},
	{
		id: 2,
		img: event_img_2,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 3,
		img: event_img_3,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 4,
		img: event_img_4,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 5,
		img: event_img_5,
		title: "Titlet",
		des: "Description",
	},	 
	{
		id: 6,
		img: event_img_6,
		title: "Titlet",
		des: "5555Description",
	},
	{
		id: 7,
		img: event_img_7,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 8,
		img: event_img_8,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 9,
		img: event_img_9,
		title: "Titlet",
		des: "Description",
	},
	{
		id: 10,
		img: event_img_10,
		title: "Titlet",
		des: "Description",
	},

];

export default event_data;
