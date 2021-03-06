import React from "react";
import { connect } from "react-redux";
import { addNote, editNote } from "../../actions";
import { Form, TitleField, DescriptionField, TagField, Button } from "../styling/NoteFormStyling";

class NoteForm extends React.Component {
  state = {
    title: "",
    content: "",
    tags: [],
    _id: null
  };

  matchRespectiveNote = () => {
    //This is for cases where NoteForm is being pulled up to edit an existing note
    this.props.notes.forEach(note => {
      if (this.props.match.params.id === note._id) {
        this.setState({ ...note });
      }
    });
  };

  componentDidMount() {
    this.matchRespectiveNote();
  }

  componentWillReceiveProps() {
    //Sets the formatting the state should follow when receiving those respective props
    this.setState({ title: "", content: "" });
  }

  handleChange = event => {
    // Your classic change handler for when something is typed into a form
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //Directs it after submitting the modified note
    const urlPath = this.props.match.url;
    urlPath === "/noteform"
      ? this.props.addNote(this.state)
      : this.props.editNote(this.state);
    this.setState({ title: "", content: "", tags: []});
    this.props.history.push("/");
  };

  render() {
    const urlPath = this.props.match.url;
    return (

      <Form>
        <h2>{urlPath === "/noteform" ? "Create New Note:" : "Edit Note:"}</h2>
        <TitleField
          name="title"
          type="text"
          placeholder="Note Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <DescriptionField
          name="content"
          placeholder="Note Content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <TagField
          name="tags"
          placeholder="tags"
          value={this.state.tags}
          onChange={this.handleChange}
        />
        <Button type="submit" onClick={this.handleSubmit}>
          {urlPath === "/noteform" ? "Save" : "Update"}
        </Button>
      </Form>

    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(
  mapStateToProps,
  { addNote, editNote }
)(NoteForm);