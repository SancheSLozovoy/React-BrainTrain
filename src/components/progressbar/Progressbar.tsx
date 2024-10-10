import { Progress } from "antd";

const Progressbar: React.FunctionComponent = () => {
    return (
        <Progress style={{width: 0, marginLeft: 10}}percent={100} percentPosition={{ align: 'center', type: 'inner' }} size={[400, 20]} />
    );
}
 
export default Progressbar;