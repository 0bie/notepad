import Quill from 'quill/core';
import Snow from 'quill/themes/snow';
import Toolbar from 'quill/modules/toolbar';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import List from 'quill/formats/list';
import Image from 'quill/formats/image';
import Blockquote from 'quill/formats/blockquote';

Quill.register({
  'modules/toolbar': Toolbar,
  'themes/snow': Snow,
  'formats/bold': Bold,
  'formats/list': List,
  'formats/image': Image,
  'formats/header': Header,
  'formats/italic': Italic,
  'formats/blockquote': Blockquote
});

export default Quill;

(function loadChunk() {
  import('../routes/post');
})();
