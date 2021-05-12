import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import Spinner from '../layout/Spinner';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NotifySubscribers.css';
import { notifySubscribers } from '../../services/subscribersService';

function NotifySubscribers({ setAlert }) {
  const [subject, setSubject] = useState('');
  const [bodyEditorState, setBodyEditorState] = useState(
    EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setSubject('');
    setBodyEditorState(EditorState.createEmpty());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const htmlData = draftToHtml(
      convertToRaw(bodyEditorState.getCurrentContent())
    );

    if (!subject?.trim() || !htmlData?.trim() || htmlData === '<p></p>') {
      return setAlert('Invalid Data', 'danger');
    }

    try {
      await notifySubscribers(subject, htmlData);
      setAlert('Sent Mail', 'success');
    } catch (ex) {
      setAlert('Mail Sent Failed', 'danger');
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return (
    <section className='notify-subscribers text-center'>
      <h1 className='text-primary mg-sm'>
        Send News Letter to your Subscribers!
      </h1>
      <p className='lead'>
        <i className='far fa-envelope'></i> Notify your daily update to your
        Subscribers!
      </p>

      <form className='form notify-form mg-sm' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            placeholder='Subject'
            name='subject'
            id='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='boxy'>Body</label>
          <Editor
            editorState={bodyEditorState}
            onEditorStateChange={setBodyEditorState}
            toolbarClassName='editor-tool-bar'
            editorClassName='editor-content'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
      </form>

      {loading && <Spinner />}
    </section>
  );
}

NotifySubscribers.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(NotifySubscribers);
