class Application extends React.Component {
    render() {
        return (
            <canvas id="drawing_area" className="drawing_area"></canvas>
        )
    }
};

ReactDOM.render(<Application/>, document.getElementById('application_box'));
