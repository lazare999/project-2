import { GoogleMap, LoadScript } from '@react-google-maps/api';
import classes from './ContactPage.module.css';

function ContactPage() {
    const apiKey = process.env.API_KEY;

    const mapStyles = {
        height: '400px',
        width: '100%',
    };

    const defaultCenter = {
        lat: 41.69727632668274,
        lng: 44.78897496413404,
    };

    return <>
        <div className={classes.container}>
            <div className={classes.contactInfo}>
                <div className={classes.grayLine}>
                    <h1>Contact</h1>
                </div>
                <div className={classes.contactContainer}>
                    <div className={classes.addressContainer}>
                        <span>Address:</span>
                        <p className={classes.address}>Tbilisi Georgia...</p>
                    </div>
                    <div className={classes.contactMethods}>
                        <div>
                            <span>Tel:</span>
                            <p>+995 555 123 456</p>
                            <p>+995 0322 123 456</p>
                        </div>
                        <div className={classes.email}>
                            <span>Email:</span>
                            <p>info@gmail.com</p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <span>Working Hours:</span>
                        <p>10:00 - 18:00</p>
                    </div>
                </div>
            </div>
            <div className={classes.mapContainer}>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10} />
                </LoadScript>
            </div>
        </div>
    </>
}

export default ContactPage;