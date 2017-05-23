class Application extends React.Component {
    render() {
        return (
            <div id="application_inner" className="application_inner">
                <CatalogDisplay/>
                <Cotroller/>
                <Console/>
                <div className="clear"></div>
            </div>
        )
    }
};

class CatalogDisplay extends React.Component {
    render() {
        return (
            <textarea
                id="catalog_display"
                className="catalog_display"
                readOnly="readonly"
                wrap="off"
            ></textarea>
        )
    }
}
class Cotroller extends React.Component {
    render() {
        return (
            <div className="controller_inner">
                <input type="text" value="" id="request_input" className="request_input" />
                <input type="button" value="GET" className="get_button"></input>
                <input type="button" value="DELETE" className="delete_button"></input>
                <div className="clear"></div>
            </div>
        )
    }
}
class Console extends React.Component {
    render() {
        return (
            <textarea
                id="console"
                className="console"
                readOnly="readonly"
                wrap="off"
            ></textarea>
        )
    }
}

ReactDOM.render(<Application/>, document.getElementById('application_box'));
