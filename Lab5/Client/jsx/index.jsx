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
    doRequest(event) {
        event.preventDefault();
        return false;
    }
    render() {
        return (
            <form className="controller_inner" onSubmit={ this.doRequest }>
                <input type="text" value="" id="request_input" className="request_input" />
                <input type="submit" value="GET" id="get_button" className="get_button"></input>
                <input type="submit" value="DELETE" id="delete_button" className="delete_button"></input>
                <div className="clear"></div>
            </form>
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
