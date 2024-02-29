import { FC } from "react";
import Template from "react-mustache-template-component";

export type iTemplate = {
    css: string;
    template: string;
    data: any
}

const TemplateComponent: FC<iTemplate> = (props) => {
    let { css, template, data } = props
    return (
        <>
            <style type="text/css">{css}</style>
            <Template template={template} data={data} />
        </>
    );
}

export default TemplateComponent