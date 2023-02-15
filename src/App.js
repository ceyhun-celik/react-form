import { useEffect, useMemo, useState } from "react";

function App() {
  const genders = [
    {key: '1', value: 'Erkek'},
    {key: '2', value: 'Kadın'},
  ]

  const categoryList = [
    {key: '1', value: 'PHP'},
    {key: '2', value: 'JavaScript'},
    {key: '3', value: 'HTML'},
    {key: '4', value: 'CSS'},
  ]

  const levels = [
    {key: 'beginner', value: 'Başlangıç'},
    {key: 'jr_developer', value: 'Jr. Developer'},
    {key: 'sr_developer', value: 'Sr. Developer'},
  ]

  const [name, setName] = useState('ceyhun')
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [categories, setCategories] = useState([])
  const [rule, setRule] = useState(true)
  const [rules, setRules] = useState([
    {key: 1, value: '1. kuralı kabul ediyorum', checked: false},
    {key: 2, value: '2. kuralı kabul ediyorum', checked: false},
    {key: 3, value: '3. kuralı kabul ediyorum', checked: true},
  ])
  const [level, setLevel] = useState('jr_developer')
  const [avatar, setAvatar] = useState(false)
  const [image, setImage] = useState(false)

  const selectedGender = useMemo(() => genders.find(g => g.key === gender), [gender])
  const selectedCategories = useMemo(() => categoryList.filter(c => categories.includes(c.key)), [categories])

  const checkRule = (key, checked) => {
    setRules(rules => rules.map(rule => {
      if (key === rule.key) {
        rule.checked = checked
      }

      return rule
    }))
  }

  const enabled = rules.every(rule => rule.checked)
  const selectedLevel = useMemo(() => levels.find(l => l.key === level), [level])

  useEffect(() => {
    if (avatar) {
      const fileReader = new FileReader()

      fileReader.addEventListener('load', function() {
        setImage(this.result)
      })

      fileReader.readAsDataURL(avatar)
    }
  }, [avatar])

  return (
    <div>
      <button onClick={() => setName('çelik')}>Soyad yap</button>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      {name}
      <hr />

      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      {description}
      <hr />

      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="">-- Seçiniz --</option>
        {genders.map((gender) => <option value={gender.key} key={gender.key}>{gender.value}</option>)}
      </select>
      {gender} <pre>{JSON.stringify(selectedGender, null, 2)}</pre>
      <hr />

      <button onClick={() => setCategories([1, 3, 4])}>Kategorileri Seç</button>
      <select value={categories} multiple={true} onChange={e => setCategories([...e.target.selectedOptions].map(option => option.value))}>
        {categoryList.map(category => <option value={category.key} key={category.key}>{category.value}</option>)}
      </select>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <pre>{JSON.stringify(selectedCategories, null, 2)}</pre>
      <hr />

      <label>
        <input type="checkbox" checked={rule} onChange={e => setRule(e.target.checked)} />
        Kuralları kabul ediyorum
      </label>
      <button disabled={!rule}>Devam et</button>
      <hr />

      {rules.map(rule => (
        <label key={rule.key}>
          <input type="checkbox" checked={rule.checked} onChange={e => checkRule(rule.key, e.target.checked)} />
          {rule.value}
        </label>
      ))}
      <br />
      <pre>{JSON.stringify(rules, null, 2)}</pre>
      <button disabled={!enabled}>Tüm şartları kabul ediyorum</button>
      <hr />

      {levels.map((l, index) => (
        <label key={index}>
          <input type="radio" value={l.key} checked={l.key === level} onChange={e => setLevel(e.target.value)} />
          {l.value}
        </label>
      ))} | {level} | <pre>{JSON.stringify(selectedLevel, null, 2)}</pre>
      <hr />

      <label>
        <input type="file" onChange={e => setAvatar(e.target.files[0])} />
      </label>
      {avatar && (
        <>
          <h4>{avatar.name}</h4>
          {image && <img src={image} alt="" />}
        </>
      )}
    </div>
  );
}

export default App;
