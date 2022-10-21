<template>
<div class="example-full">
  <h3 id="example-title" class="example-title text-center">Upload de Arquivos</h3>

  <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
		<h3>Solte arquivos para upload</h3>
  </div>
  <div class="upload" v-show="!isOption">
    <div class="table-responsive">
      <table class="table table-hover" style="overflow: hidden">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nome</th>
            <th>status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!files.length">
            <td colspan="9">
              <div class="text-center p-5 " >
                <h4>Solte arquivos em qualquer lugar<br>
                 para fazer upload
                <br/>ou</h4>
                <label :for="name" class="btn btn-lg btn-info">Selecionar Arquivos</label>
              </div>
            </td>
          </tr>
          <tr v-for="(file, index) in files" :key="file.id">
            <td>{{index + 1}}</td>
            <td>
              <div class="filename">
                {{file.name}}
              </div>
              <div class="progress" v-if="file.active || file.progress !== '0.00'">
                <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}" role="progressbar" :style="{width: file.progress + '%'}">{{file.progress}}%</div>
              </div>
            </td>
            <td v-if="file.error">{{file.error}}</td>
            <td v-else-if="file.success">success</td>
            <td v-else-if="file.active">active</td>
            <td v-else></td>
            <td style="position:absolute" >
              <div class="btn-group">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button">
                  Ação
                </button>
                <div class="dropdown-menu" style="width: auto">
                  <a :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'}" href="#" 
                      @click.prevent="fileSelectedEdit = file, modEdit = true;"    
                    > Editar
                  </a>
                  <!--
                  <a :class="{'dropdown-item': true, disabled: !file.active}" href="#" @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false">Cancelar</a>
                  -->
                  <!--
                  <a class="dropdown-item" href="#" v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false})">Abort</a>
                  <a class="dropdown-item" href="#" v-else-if="file.error && file.error !== 'compressing' && file.error !== 'image parsing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">Repetir upload</a>
                  <a :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing' || file.error === 'image parsing'}" href="#" v-else @click.prevent="file.success || file.error === 'compressing' || file.error === 'image parsing' ? false : $refs.upload.update(file, {active: true})">Upload</a>
                  -->
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="example-foorer">
      <div class="btn-group">
        <file-upload
          class="btn btn-primary dropdown-toggle"
          :post-action="postAction"
          :put-action="putAction"
          :extensions="extensions"
          :accept="accept"
          :multiple="multiple"
          :directory="directory"
          :create-directory="createDirectory"
          :size="size || 0"
          :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
          :headers="headers"
          :data="data"
          :drop="drop"
          :drop-directory="dropDirectory"
          :add-index="addIndex"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <i class="fa fa-plus"></i>
          Selecione
        </file-upload>
        <div class="dropdown-menu">
          <label class="dropdown-item" :for="name">Adicionar Arquivos</label>
          <a class="dropdown-item" href="#" @click="onAddFolder">Adicionar Pasta</a>
          <!--<a class="dropdown-item" href="#" @click.prevent="addData.show = true">Adicionar Dados</a>-->
        </div>
      </div>
      <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="saveUpload()">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
        Realizar Upload
      </button>
      <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
        <i class="fa fa-stop" aria-hidden="true"></i>
        Stop Upload
      </button>
    </div>
  </div>

  <div :class="{'modal-backdrop': false, 'fade': false, show: addData.show}"></div> <!--  'modal-backdrop': true, 'fade': true,  -->
  <div :class="{modal: true, fade: true, show: addData.show}" id="modal-add-data" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add data</h5>
          <button type="button" class="close"  @click.prevent="addData.show = false">
            <span>&times;</span>
          </button>
        </div>
        <form @submit.prevent="onAddData">
          <div class="modal-body">
            <div class="form-group">
              <label for="data-name">Name:</label>
              <input type="text" class="form-control" required id="data-name"  placeholder="Please enter a file name" v-model="addData.name">
              <small class="form-text text-muted">Such as <code>filename.txt</code></small>
            </div>
            <div class="form-group">
              <label for="data-type">Type:</label>
              <input type="text" class="form-control" required id="data-type"  placeholder="Please enter the MIME type" v-model="addData.type">
              <small class="form-text text-muted">Such as <code>text/plain</code></small>
            </div>
            <div class="form-group">
              <label for="content">Content:</label>
              <textarea class="form-control" required id="content" rows="3" placeholder="Please enter the file contents" v-model="addData.content"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="addData.show = false">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div :class="{'modal-backdrop': false, 'fade': false, show: editFile.show}"></div> <!-- 'modal-backdrop': true, 'fade': true, -->
  <div :class="{modal: true, fade: true, show: editFile.show}" id="modal-edit-file" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit file</h5>
          <button type="button" class="close"  @click.prevent="editFile.show = false">
            <span>&times;</span>
          </button>
        </div>
        <form @submit.prevent="onEditorFile">
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" required id="name"  placeholder="Please enter a file name" v-model="editFile.name">
            </div>
            <div class="form-group" v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'">
              <label>Image: </label>
              <div class="edit-image">
                <img :src="editFile.blob" ref="editImage" />
              </div>

              <div class="edit-image-tool">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary" @click="editFile.cropper.rotate(-90)" title="cropper.rotate(-90)"><i class="fa fa-undo" aria-hidden="true"></i></button>
                  <button type="button" class="btn btn-primary" @click="editFile.cropper.rotate(90)"  title="cropper.rotate(90)"><i class="fa fa-repeat" aria-hidden="true"></i></button>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary" @click="editFile.cropper.crop()" title="cropper.crop()"><i class="fa fa-check" aria-hidden="true"></i></button>
                  <button type="button" class="btn btn-primary" @click="editFile.cropper.clear()" title="cropper.clear()"><i class="fa fa-remove" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="editFile.show = false">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

  </div>

  <div
      v-if="modEdit" 
      class="modDetails"      
      >
      <div class="modal-dialog modal-xl m-0" style="border-radius 4px">
        <div class="modal-content">
          <div class="modal-header">
            <div> <h4>Adicionar Informações</h4> </div>
            <button type="button" class="bi bi-x border-0" @click="fecharMod()"></button>
          </div>
          <div class="modal-body">

            <div>

               <form  @submit.prevent="salvarDesenho" class="pt-0"  style="max-width: 100%">
                  <div class=" col-lg-12  p-0" >
                    <div class="d-flex collum-form mt-2 p-0">
                      <div class="form-group p-0 pr-1 col-lg-6">
                          <label>Material:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-account-outline"></i>
                            </span>
                          </div>
                            <input type="text" class="form-control text-style"  v-model="materialPeca"> 
                        </div>
                      </div>
                      <div class="form-group p-0 col-lg-6">
                          <label>Quantidade de Peças:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="mdi mdi-format-list-numbers"></i>
                            </span>
                          </div>
                          <input type="text" class="form-control text-style"  v-model="quantidadePeca"> 
                        </div>
                      </div>
                    </div>
                  </div>
              </form>
              
            </div>
                  
          </div>
          <div class="modal-footer d-flex p-3 justify-content-end">
                  <div>
                    <button type="button" class="btn btn-success" 
                            @click.prevent="fileSelectedEdit.active || fileSelectedEdit.success || fileSelectedEdit.error === 'compressing' ? false :  onEditFileShow()"   
                          > 
                            Salvar 
                    </button>
                    <button type="button" class="btn btn-danger"> Cancelar </button>
                  </div>
          </div> 
        </div>
      </div>
  </div>

  <div v-if="modEdit" class="modal-backdrop show" style="position: fixed; z-index: 1"> </div>

</div>

</template>

<script>

import Cropper from 'cropperjs'
import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'

export default {
  components: {
    FileUpload,
  },

  data() {
    return {
      files: [],
      // accept: 'image/png,image/gif,image/jpeg,image/webp',
      // extensions: 'gif,jpg,jpeg,png,webp',
      accept: '',
      extensions: '', 
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      createDirectory: false,
      addIndex: false,
      thread: 3,
      name: 'file',
      postAction: '/upload/post',
      putAction: '/upload/put',
      headers: {
        'X-Csrf-Token': 'xxxx',
      },
      data: {
        '_csrf_token': 'xxxxxx',
      },

      autoCompress: 1024 * 1024,
      uploadAuto: false,
      isOption: false,

      addData: {
        show: false,
        name: '',
        type: '',
        content: '',
      },

      editFile: {
        show: false,
        name: '',
      },
      showEdit: false,
      modEdit : false,
      materialPeca: '',
      quantidadePeca: '',
      fileSelectedEdit: {},
    }
  },

  watch: {
    'editFile.show'(newValue, oldValue) {

      // 关闭了 自动删除 error
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
      }

      if (newValue) {
        this.$nextTick( () => {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false,
          })
          this.editFile = {
            ...this.editFile,
            cropper
          }
        })
      }
    },

    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
  },

  methods: {

    deletfileUpload(){

    },

    fecharMod(){
      this.modEdit = false
    },

    saveUpload(){
      this.$emit('filesDrawingSelected',  this.files)
    },

    inputFilter(newFile, oldFile, prevent) {

      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前

        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          console.log("newFile.name --->>", newFile.name)
          return prevent()
        }

        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        // Automatic compression
        // 自动压缩
        if (newFile.file && newFile.error === "" && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {

          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: 1024 * 1024,
            maxWidth: 512,
            maxHeight: 512,
          })
          imageCompressor.compress(newFile.file)
            .then((file) => {
              this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, { error: err.message || 'compress' })
            })
        }
      }


      if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {

        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = (window.URL || window.webkitURL)
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }

      // image size
      // image 尺寸
      if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === "image/" && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {

        newFile.error = 'image parsing'
        let img = new Image();
        img.onload = () => {
          this.$refs.upload.update(newFile, {error: '', height: img.height, width: img.width})
        } 
        img.οnerrοr = (e) => {
          this.$refs.upload.update(newFile, { error: 'parsing image size'}) 
        }
        img.src = newFile.blob
      }
    },

    // add, update, remove File Event
  async  inputFile(newFile, oldFile) {
   
      if (newFile && oldFile) {
        // update

        if (newFile.active && !oldFile.active) {
          // beforeSend

          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }

        if (newFile.progress !== oldFile.progress) {
          // progress
        }

        if (newFile.error && !oldFile.error) {
          // error
        }

        if (newFile.success && !oldFile.success) {
          // success
        }
      }


      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }

      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },


    alert(message) {
      alert(message)
    },


    onEditFileShow() {
      console.log(" fileSelectedEdit", this.fileSelectedEdit)
      
      this.fileSelectedEdit["quantPeca"] = '';
      this.fileSelectedEdit["materialPeca"] = '';

      this.editFile = { ...this.fileSelectedEdit, show: true }
      this.$refs.upload.update(
          this.fileSelectedEdit, { 
                  error: 'editado',
                  'quantPeca': this.quantidadePeca ? this.quantidadePeca : '', 
                  'materialPeca': this.materialPeca ? this.quantidadePeca : '', 
                })
      },

    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }

      let data = {
        name: this.editFile.name,
        error: '',
      }
      if (this.editFile.cropper) {
        let binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
        let arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.upload.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false

      console.log("this.$refs.upload onEditorFile --->>", this.$refs.upload)
    
    },

    // add folder
    onAddFolder() {
      if (!this.$refs.upload.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      let input = document.createElement('input')
      input.style = "background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;"
      input.type = 'file'
      input.setAttribute('allowdirs', true)
      input.setAttribute('directory', true)
      input.setAttribute('webkitdirectory', true)
      input.multiple = true
      document.querySelector("body").appendChild(input)
      input.click()
      input.onchange = (e) => {
        this.$refs.upload.addInputFile(input).then(function() {
          document.querySelector("body").removeChild(input)
        })
      }
      console.log(" this.$refs.upload onAddFolder ---->",  this.$refs.upload)
    },

    onAddData() {
      this.addData.show = false
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        return
      }

      let file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type,
      })
      this.$refs.upload.add(file)
    }
  }
}
</script>

<style>
.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all .2s
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

.example-full .btn-group .dropdown-toggle {
  margin-right: .6rem
}

.td-image-thumb {
  max-width: 4em;
  max-height: 4em;
}

.example-full .filename {
  margin-bottom: .3rem
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: .5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.example-full .edit-image img {
  max-width: 100%;
}
.example-full .edit-image-tool {
  margin-top: .6rem;
}

.example-full .edit-image-tool .btn-group{
  margin-right: .6rem;
}

.example-full .footer-status {
  padding-top: .4rem;
}

.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-full .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

.example-full .modDetails {
  position: fixed;
  background: #fff;
  z-index:2;
  width: 50%;
  margin:auto;
  justify-content: center;
  vertical-align: middle;
  text-align:center;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  transition: 0.1s ease-in;
  border-radius: 4px; 
}

</style>