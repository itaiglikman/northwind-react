import { Notyf } from "notyf";

class NotifyService {

    // defining the notification:
    private notification = new Notyf({
        duration: 4000,
        position: { x: "center", y: "top" }
    });

    // success message:
    public success(message: string): void {
        this.notification.success(message);
    }

    // error message:
    public error(err: any): void {
        // get the accurate error message:
        let message = this.extractMessage(err)
        this.notification.error(message);
    }

    // extracting the error message from the server by the accurate situation:
    private extractMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response.data; //axios
        if (Array.isArray(err.response?.data)) return err.response.data[0]; //show first error.
        if (typeof err.message === "string") return err.message;
        return "Some error, please try again.";
    }
}

const notifyService = new NotifyService();

export default notifyService;

