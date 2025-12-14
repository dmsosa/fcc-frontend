import { Stack } from "react-bootstrap";

export default function SidebarFooter ({ sidebarExpanded, setSidebarExpanded }: { sidebarExpanded: boolean, setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {
    console.log( 'footer log' + sidebarExpanded + setSidebarExpanded + 'end footer log')
    return (
            <div className="sidebar-footer">
              <Stack>
                
              </Stack>
            </div>
  );
}


