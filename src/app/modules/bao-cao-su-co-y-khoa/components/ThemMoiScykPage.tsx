import { useState } from "react";
import ThemMoiScykForm from "./ThemMoiScykForm";
import LoadingIndicator from "../../component/loading/LoadingIndicator";
import { I18nProvider } from "../../../../_metronic/i18n/i18nProvider";
import AppContext from "../../../AppContext";
import { ToastContainer, Zoom, toast } from "react-toastify";

const ThemMoiScykPage = () => {
	const [pageLoading, setPageLoading] = useState<boolean>(false);

	return (
		<AppContext.Provider value={{ pageLoading, setPageLoading }}>
			<LoadingIndicator show={pageLoading} />
			<I18nProvider>
				<ThemMoiScykForm />
				<ToastContainer
					autoClose={3000}
					position={toast.POSITION.TOP_RIGHT}
					transition={Zoom}
					theme='colored'
					pauseOnHover={false}
				/>
			</I18nProvider>
		</AppContext.Provider>
	)
}

export default ThemMoiScykPage;