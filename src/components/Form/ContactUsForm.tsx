export default function ContactUsForm() 
{
    return (
        <form action="">
            <legend>Contact us</legend>
            <fieldset><input id="name" type="text" required /><label htmlFor="name">Name</label></fieldset>
            <fieldset><input id="surname" type="text" /><label htmlFor="surname">Surname</label></fieldset>
            <fieldset><input id="email" type="email" required /><label htmlFor="email">Email</label></fieldset>
            <fieldset><input id="gdpr" type="checkbox" required /><label htmlFor="gdpr">Accept GDPR Conditions</label></fieldset>
        </form>
    );
}
