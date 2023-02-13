import { useConversations } from "./ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

interface IDashboard {
    id: string;
}

export default function Dashboard ({
    id
}: IDashboard){
    const { selectedConversation } = useConversations()

    return (
        <div className="w-screen h-screen flex bg-zinc-800">
            <Sidebar id={id} />
            {
                selectedConversation && (
                    <OpenConversation />
                )
            }
        </div>
    )
}