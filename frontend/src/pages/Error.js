import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";


function ErrorPage() {
    const error = useRouteError();

    let title = 'Bir hata meydana geldi!';
    let message = 'Birşeyler ters gitti.';

    if (error.status === 500) {
        message = error.data.message;
    }
    if(error.status === 404) 
       { title ='Not Found!'
        message = 'Could not find resource or page.'
    }

  return  (
  <>
  <MainNavigation />
  <PageContent title="Bir hata meydana geldi!">
    <p>{message}</p>
  </PageContent>;
  </>
  );
}

export default ErrorPage;
