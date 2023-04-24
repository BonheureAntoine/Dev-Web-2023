import React from "react";

class ClickOnText extends React.Component{
    click(){
        console.log('1 :',this.props.link);
    }

    render(){
        return(
            <div className={this.props.class} onClick={()=>this.click()}>
                {this.props.name}
            </div>
        )
    }
}
export default ClickOnText;

/*

constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}*/