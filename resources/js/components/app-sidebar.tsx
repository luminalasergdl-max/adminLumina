import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { index } from '@/routes/customers';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CircleUser, ChartNoAxesCombined, CreditCard, Tag } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Clientes',
        href: '/customers',
        icon: CircleUser,
    },
    {
        title: 'Reportes',
        href: '/reports',
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Tarjetas de regalo',
        href: '/gift_card',
        icon: CreditCard,
    },
    {
        title: 'Campañas',
        href: '/gift_card_campaign',
        icon: Tag,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={index()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
