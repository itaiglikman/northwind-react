import { Clear, ContactMail, Message, Password, Send } from "@mui/icons-material";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs">
            <Typography variant="h3">
                contact us
                <ContactMail fontSize="large" />
            </Typography>
            <form>
                <TextField type="text" label="Name" className="TextBox" />
                <TextField type="email" label={<ContactMail />} />
                <TextField type="text" label={<Message />} />
                <TextField type="password" label={<Password />} />
                <FormControlLabel control={<Checkbox />} label={"Send emails to this address"} />

                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary"><Send /></Button>
                    <Button color="secondary" type="reset"><Clear /></Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default ContactUs;
