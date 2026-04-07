import { SVGAttributes } from 'react';
import Logo from '@/public/logo.svg';
import { asset } from '@/lib/utils';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={asset('logo.svg')} width="150" height="148" alt="" />
    )
}
