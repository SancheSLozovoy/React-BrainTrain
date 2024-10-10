import { Progress } from "antd";

const Progressbar: React.FunctionComponent = () => {
    return (
        <Progress percent={100} percentPosition={{ align: 'center', type: 'inner' }} size={[400, 20]} />
    );
}
 
export default Progressbar;