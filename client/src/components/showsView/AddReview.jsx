import React from 'react';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_rating: '',
      text: '',
    };
  }

  handleInputChange(e) {
    // console.log("THIS IS THE NAME", selectedPokemon.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // console.log("THIS IS NAME OF POKEMON FROM FORM", this.state.name);

    this.props.handleAddNewReview({
      show_id: this.props.id,
      user_id: this.props.userId,
      show_rating: this.state.show_rating,
      text: this.state.text,
    });
    this.setState({
      show_rating: '',
      text: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <div className="addReviewBox">
            Write Review:
            <input
              type="text"
              // addReview="addReview"
              name="text"
              value={this.state.text}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="addShowRatingBox">
            Rate Show 1-10:
            <input
              type="number"
              name="show_rating"
              // addReview="addReview"

              value={this.state.show_rating}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>

          <input type="submit" value="Submit Review" />
        </div>
      </form>
    );
  }
}
export default AddReview;

//add
