export type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
};

export const messagesByConversation: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Здраво, како ти мина денот?", sender: "them", time: "20:55" },
    { id: "2", text: "Прилично добро, цел ден работев на мојот проект", sender: "me", time: "21:02" },
    { id: "3", text: "Супер! Јаде ли нешто?", sender: "them", time: "21:05" },
    { id: "4", text: "Да, вечерав пред еден час", sender: "me", time: "21:10" },
    { id: "5", text: "Не заборавај да ми се јавиш вечерва", sender: "them", time: "21:40" },
    { id: "6", text: "Javi mi se", sender: "them", time: "22:40" },

  ],
  "2": [
    { id: "1", text: "Слободен/слободна ли си утре?", sender: "them", time: "17:50" },
    { id: "2", text: "Да, после 16 часот", sender: "me", time: "18:05" },
    { id: "3", text: "Се гледаме утре во кафулето!", sender: "them", time: "18:12" },
    { id: "4", text: "Odi insta", sender: "them", time: "20:12" },
  ],
  "3": [
    { id: "1", text: "Ја заврши ли задачата?", sender: "them", time: "Yesterday" },
    { id: "2", text: "Zavrsi be?", sender: "them", time: "Вчера" },

],
  "4": [
    { id: "1", text: "Your code is 482913", sender: "them", time: "Пон" },
  ],
};