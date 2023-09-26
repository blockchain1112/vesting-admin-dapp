import { useEffect } from 'react';
import ReactDOM from 'react-dom';


const ReactModalPortal = props => {
    const modalRoot = document.createElement('div');
    modalRoot.id = props.formId;
    props.attributes.forEach((x) => modalRoot.setAttribute(x.key, x.val));

    useEffect(() => {
        document.body.appendChild(modalRoot);
        return () => {
        document.body.removeChild(modalRoot);
        }
    });

    return ReactDOM.createPortal(props.children, modalRoot);
}

export default ReactModalPortal;