import { Menu, Sidebar } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

type Props = {}

const MobileSidebar = (props: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar