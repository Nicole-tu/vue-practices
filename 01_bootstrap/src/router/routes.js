import Main from "@/components/views/Main";
import Home from "@/components/views/Home";
import Quotes from "@/components/views/Quotes";
import Login from "@/components/views/Login";
import Calendar from "@/components/views/Calendar";
import Notes from "@/components/views/Notes";
import Bootstrap from "@/components/Bootstrap";

const routes = [{
        path: "/",
        name: "Main",
        component: Main,
        children: [{
                path: "/Home",
                name: "home",
                component: Home
            }, {
                path: "/Quotes",
                name: "quotes",
                component: Quotes
            },
            {
                path: "/Calendar",
                name: "calendar",
                component: Calendar
            },
            {
                path: "/Notes",
                name: "notes",
                component: Notes
            }
        ]
    },
    {
        path: "/Login",
        name: "login",
        component: Login
    },
    {
        path: "/Bootstrap",
        name: "bootstrap",
        component: Bootstrap
    },
    {
        path: "*",
        redirect: "/Login"
    }
];

export default routes;