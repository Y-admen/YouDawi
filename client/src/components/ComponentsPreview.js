import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Switch from './Switch';
import Checkbox from './Checkbox';


function ComponentsPreview() {
    return (
        <div className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Routes</h2>
            <Link label='Home' path='/home' />
            <Link label='Doctors' path='/doctors' />
            <Link label='Appointments' path='/appointments' />
            <Link label='Patients' path='/patients' />
            <Link label='About' path='/about' />
            <Link label='Register' path='/register' />
            <Link label='PublicHome' path='/public-home' />
            <Link label='Login' path='/login' />
            <Link label='LandingPage' path='/public-home' />
            <Link label='doctorprofile' path='/doctorprofile' />
            <Link label='Health History' path='/health-history' />
            <Link label='Prescription' path='/Write-prescription/1/1' />
             <Link label='doctorprofile' path='/doctorprofile' />
             <Link label='bookappointment' path='/bookappointment' />
             <Link label='confirmnewpassword' path='/confirmnewpassword' />
            

            <h2 className="text-3xl font-bold mb-4">Components</h2>
            <div className="mb-4">
                <Button label="Button" />
            </div>
            <div className="mb-4">
                <Input label="Input" type="text" placeholder="Placeholder" name="input" value="" onChange={() => { }} required />
            </div>
            <div className="mb-4">
                <Switch label="Switch" name="switch" checked={false} onChange={() => { }} />
            </div>
            <div className="mb-4">
                <Checkbox label="Checkbox" name="checkbox" checked={false} onChange={() => { }} />
            </div>
        </div>
    );
}

function Link(props) {
    return (
        <div className="mb-4">
            <NavLink to={props.path}>{props.label}</NavLink>
        </div>
    );
}

export default ComponentsPreview;