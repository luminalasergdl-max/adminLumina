import { ExtendedCustomer, diseaseFields } from '@/types/customer'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

import {
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item'

import { CheckCircle2Icon, CircleXIcon } from 'lucide-react'

type CustomerShowDrawerProps = {
    customer: ExtendedCustomer
    birthdateString: string
}

export function CustomerShowDrawer({ customer, birthdateString }: CustomerShowDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger>
                <ItemTitle className='mt-4'>Ver información completa</ItemTitle>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='text-xl font-semibold'>
                        {customer.full_name}
                    </DrawerTitle>
                </DrawerHeader>
                <Tabs defaultValue="personal_data" className='mb-10 md:p-4'>
                    <TabsList className='text-center w-full'>
                        <TabsTrigger className='text-xs' value="personal_data">Datos Personales</TabsTrigger>
                        <TabsTrigger className='text-xs' value="marketing">Cómo nos conociste?</TabsTrigger>
                        <TabsTrigger className='text-xs' value="diseases">Padecimientos, etc</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal_data" className='mb-8 mx-4'>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            <div className="block lg:hidden">
                                <ItemTitle className='mt-8'>
                                    Email
                                </ItemTitle>
                                <ItemDescription>
                                    {customer.email || '-'}
                                </ItemDescription>
                            </div>
                            <div className="block lg:hidden">
                                <ItemTitle className='mt-8'>
                                    Genero
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{customer.gender || '-'}</span>
                                </ItemDescription>
                            </div>
                            <div className="block lg:hidden">
                                <ItemTitle className='mt-8'>
                                    Fecha de nacimiento
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{birthdateString}</span>
                                </ItemDescription>
                            </div>
                            <div className="block lg:hidden">
                                <ItemTitle className='mt-8'>
                                    Código Postal
                                </ItemTitle>
                                <ItemDescription>
                                    <span className='capitalize'>{customer.zip_code || '-'}</span>
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-8'>
                                    Telefóno de contacto 2
                                </ItemTitle>
                                <ItemDescription>
                                    {customer.contact_phone_2 ?
                                        <a href={`https://wa.me/${customer.contact_phone_2}`} target='blank' rel="noopener" >
                                            {customer.contact_phone_2}
                                        </a>
                                        : '-'}
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-8'>
                                    Contacto Emergencia
                                </ItemTitle>
                                <ItemDescription>
                                    <span>{customer.emergency_contact_name || '-'}</span>
                                </ItemDescription>
                            </div>
                            <div>
                                <ItemTitle className='mt-8'>
                                    Telefóno Contacto Emergencia
                                </ItemTitle>
                                <ItemDescription>
                                    {customer.emergency_contact_phone ?
                                        <a href={`https://wa.me/${customer.emergency_contact_phone}`} target='blank' rel="noopener" >
                                            {customer.emergency_contact_phone}
                                        </a>
                                        : '-'}
                                </ItemDescription>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="marketing" className='m-4'>
                        <ItemTitle className='mt-6'>
                            <span className={`mr-2 ${customer.instagram || 'text-muted-foreground'}`}>{customer.instagram ? <CheckCircle2Icon /> : <CircleXIcon />}</span>
                            <span className={`${customer.instagram ? 'font-semibold' : 'text-muted-foreground'}`}>Instagram</span>
                        </ItemTitle>
                        <ItemTitle className='mt-6'>
                            <span className={`mr-2 ${customer.maps || 'text-muted-foreground'}`}>{customer.maps ? <CheckCircle2Icon /> : <CircleXIcon />}</span>
                            <span className={`${customer.maps ? 'font-semibold' : 'text-muted-foreground'}`}>Maps</span>
                        </ItemTitle>
                        <ItemTitle className='mt-6'>
                            <span className={`mr-2 ${customer.mouth_mouth || 'text-muted-foreground'}`}>{customer.mouth_mouth ? <CheckCircle2Icon /> : <CircleXIcon />}</span>
                            <span className={`${customer.mouth_mouth ? 'font-semibold' : 'text-muted-foreground'}`}>Recomendación Personal</span>
                        </ItemTitle>
                        <ItemTitle className='mt-6'>
                            Otro
                        </ItemTitle>
                        <ItemDescription>
                            {customer.other_hear_about_us || '-'}
                        </ItemDescription>
                    </TabsContent>
                    <TabsContent value="diseases" className='m-4'>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            {diseaseFields.map(({ key, label }) => (
                                <div key={key} className='flex mt-4 text-xs'>
                                    <span className={`mr-2 ${customer[key] || 'text-muted-foreground'}`}>
                                        {customer[key] ? <CheckCircle2Icon size={14} /> : <CircleXIcon size={14} />}
                                    </span>
                                    <span className={`${customer[key] ? 'font-semibold' : 'text-muted-foreground'}`}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

            </DrawerContent>
        </Drawer>
    )
}
