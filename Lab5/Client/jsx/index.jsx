class Application extends React.Component {
    doRequest(event) {
        event.preventDefault();
        return false;
    }
    render() {
        return (
            <form id="application_inner" className="application_inner" onSubmit={ this.doRequest }>
                <CatalogDisplay/>
                <Cotroller/>
                <Console/>
                <div className="clear"></div>
            </form>
        )
    }
};

class CatalogDisplay extends React.Component {
    render() {
        return (
            <div id="catalog_display" className="catalog_display" ></div>
        )
    }
}
class Cotroller extends React.Component {
    render() {
        return (
            <div className="controller_inner">
                <input type="text" defaultValue="" id="request_input" wrap="off" className="request_input" />
                <input type="submit" value="GET" id="get_button" className="get_button" />
                <input type="submit" value="DELETE" id="delete_button" className="delete_button" />
                <div className="clear"></div>
            </div>
        )
    }
}
class Console extends React.Component {
    render() {
        return (
            <div id="console" className="console"></div>
        )
    }
}

ReactDOM.render(<Application/>, document.getElementById('application_box'));
